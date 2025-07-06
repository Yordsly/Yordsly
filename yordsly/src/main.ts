import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import './app/firebase.config'; // This will run the initialization

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
