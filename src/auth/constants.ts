import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || '1843bcc5a7f3ed11ad28846e8a53dea96ee0b5de9499f25e916636eaed6062e7',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
