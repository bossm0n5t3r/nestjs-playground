import { IsInt, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @ValidateIf((o) => o !== null)
  @IsString({ message: '문자열 또는 null이어야 합니다.' })
  name?: string | null;

  @IsOptional()
  @ValidateIf((o) => o !== null)
  @IsInt({ message: '정수 또는 null이어야 합니다.' })
  age?: number | null;

  @IsOptional()
  @ValidateIf((o) => o !== null)
  @IsString({ message: '문자열 또는 null이어야 합니다.' })
  breed?: string | null;
}
