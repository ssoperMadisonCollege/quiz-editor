import { Component, OnInit} from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  numberOfQuestions: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

// passing the quiz service to the app component constructor
constructor(private qSvc: QuizService) {
  // Use the quiz service here, but if it fails, 
  // the creation of the component fails : - (
}

  quizzes : QuizDisplay[] = [];


  ngOnInit() {
    // console.log(this.qSvc.getQuizzes())
    this.quizzes = this.qSvc.getQuizzes();
  };

  title = 'quiz-editor';

  myWidth = 250;

  makeImageLarger() {
    // make the image 30% larger each time you click on it
    this.myWidth *=1.3;
  }

  // Read-only/getter property
  get titleColor() {
    return this.myWidth > 400 ? "red" : "blue";
  }
}
