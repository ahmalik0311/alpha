import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ======================
  // User creation & login
  // ======================
  @Post('/create')
  create(@Body() data: User) {
    return this.userService.createUser(data);
  }

  @Post('/login')
  login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data);
  }

  // ======================
  // Twilio test endpoint
  // ======================
  @Post(':id')
  handleUser(@Req() req, @Res() res) {
    const userId = req.params.id;
    
    console.log('Request from Twilio:', req.body);

    res.type('text/xml'); // Twilio requires XML
    res.send(`
      <Response>
        <Message>Hello! Your user sID is ${userId}</Message>
      </Response>
    `);
  }

  // ======================
  // OTP Endpoints
  // ======================
  @Post('otp/send')
  sendOtp(@Body('phone') phone: string) {

    console.log('SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Token:', process.env.TWILIO_AUTH_TOKEN);
    return this.userService.sendOtp(phone);
  }

  // Optional: OTP verification
  @Post('otp/verify/tester')
  async verifyOtp(@Body() body: { phone: string; otp: string }) {
    // For trial, in-memory or DB checkS
    // Implement verification logic in UserService
    return { message: `OTP verification for ${body.phone} not implemented yet` };
  }
}