import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Emraude Tech interview API")
    .setDescription("API for Emraude Tech interview")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("Authentication", "User signup, login and JWT management")
    .addTag("Users", "User profile and management")
    .addTag("Progress", "Game progression tracking")
    .addTag("Matches", "Multiplayer game matches")
    .addTag("Leaderboard", "Rankings and statistics")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = parseInt(process.env.PORT || "1337", 10);

  console.log(`🚀 ~ Application is running on: http://localhost:${port}`);
  console.log(`📖 ~ Swagger documentation: http://localhost:${port}/api`);

  await app.listen(port, "0.0.0.0");
}

bootstrap();
