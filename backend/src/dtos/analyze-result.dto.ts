import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResult, AnalysisResultItem } from '../services/openai/openai.service';

export class AnalyzeResultItemDto implements AnalysisResultItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  carbs: number;

  @ApiProperty()
  cal: number;

  @ApiProperty()
  fat: number;

  @ApiProperty()
  protein: number;

  @ApiProperty()
  weight: number;
}

export class AnalysisResultDto implements AnalysisResult {
  @ApiProperty({ type: [AnalyzeResultItemDto] })
  items: AnalyzeResultItemDto[];
}
