// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Import the routes
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';  // For HttpClient module
import { AuthModule } from './app/features/auth/auth.module';  // Import AuthModule

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide the routes
    provideHttpClient(),     // Provide HttpClient for API calls
    importProvidersFrom(AuthModule)  // Import and provide AuthModule
  ]
}).catch(err => console.error(err));
