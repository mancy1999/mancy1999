import { ApiModelProperty } from '@nestjs/swagger';

export class QuoteDto {
    @ApiModelProperty()
    readonly Symbol: string;
}

export class QuoteListDto {
    @ApiModelProperty()
    readonly Symbols: string[];
}