import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
@UsePipes(new ValidationPipe({whitelist:true}))
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
