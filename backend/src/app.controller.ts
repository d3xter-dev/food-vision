import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnalysisResult, OpenaiService } from './services/openai/openai.service';
import { ImageService } from './services/image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageFileValidator } from './validator/image-file-validator';
import { ParseFilePipe } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { FileUploadDto } from './dtos/file-upload.dto';
import { AnalysisResultDto } from './dtos/analyze-result.dto';

@Controller()
export class AppController {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly imageService: ImageService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to analyze',
    type: FileUploadDto,
  })
  @ApiOkResponse({
    description: 'Analysis result',
    type: AnalysisResultDto,
  })
  @ApiBadRequestResponse()
  async analyze(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ImageFileValidator({})],
      }),
    )
    file: Express.Multer.File,
  ): Promise<AnalysisResultDto> {
    const hash = this.imageService.hashImage(file.buffer);

    const cachedResult = await this.cacheManager.get<AnalysisResult | undefined>(hash);
    if (cachedResult) {
      return cachedResult;
    }

    const compressedImage = await this.imageService.compressImage(file);
    const result = await this.openaiService.analyzeImage(this.imageService.toBase64(compressedImage));
    await this.cacheManager.set(hash, result, 0);

    return result;
  }
}
