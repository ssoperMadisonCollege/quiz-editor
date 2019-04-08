import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-editor';

  myWidth = 250;

  makeImageLarger() {
    // make the image 30% larger each time you click on it
    this.myWidth *=1.3
  }

  // Read-only/getter property
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }
}
