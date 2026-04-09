import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import Twilio = require('twilio');


interface OtpStore {
  [phone: string]: { otp: string; expiresAt: number };
}

@Injectable()
export class UserService {
  private client: Twilio.Twilio;
  private otpStore: OtpStore = {}; // In-memory OTP storage for testing

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  // ======================
  // Create user
  // ======================
  async createUser(data: User) {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) return { message: '! Email Already in User' };

    const hash = await bcrypt.hash(data.password, 10);
    const newUser = this.userRepository.create({ ...data, password: hash });
    return this.userRepository.save(newUser);
  }

  // ======================
  // Login
  // ======================
  async login(data: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) throw new NotFoundException('User Not Found');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid Credentials');

    const payload = { sub: user.id, username: user.fullName };
    const token = await this.jwtService.signAsync(payload);

    return { userData: await this.allUser(user.id), token };
  }

  // ======================
  // Get user with relations
  // ======================
  async allUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userBlog'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ======================
  // Send OTP
  // ======================
  async sendOtp(to: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send via Twilio
    await this.client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    // Store OTP in memory (expiry 5 min)
    this.otpStore[to] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    console.log(`OTP for ${to}: ${otp}`); // for testing
  
    return { message: 'OTP sent', otp }; // return OTP in trial/testing only
  }

  // ======================
  // Verify OTP
  // ======================
  async verifyOtp(phone: string, otp: string) {
    const record = this.otpStore[phone];
    if (!record) throw new UnauthorizedException('OTP not found');

    if (Date.now() > record.expiresAt) {
      delete this.otpStore[phone];
      throw new UnauthorizedException('OTP expired');
    }

    if (record.otp !== otp) throw new UnauthorizedException('Invalid OTP');

    delete this.otpStore[phone];
    return { message: 'OTP verified successfully' };
  }
}