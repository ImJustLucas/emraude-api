import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from "@nestjs/common";

import { ZodType } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown, _metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errorMessages = result.error.issues.map(
        (err) => `${err.path.join(".")}: ${err.message}`,
      );
      throw new BadRequestException({
        message: "Validation failed",
        errors: errorMessages,
      });
    }

    return result.data;
  }
}
