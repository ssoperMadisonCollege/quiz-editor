import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  name: string;
  questions: QuestionDisplay[];
}

interface QuestionDisplay {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private qSvc: QuizService) {
    // Use the quiz service here, but... If it fails, the creation
    // of the component fails : - (
  }

  quizzes: QuizDisplay[] = [];
  selectedQuiz: QuizDisplay = undefined;

  selectQuiz(q: QuizDisplay) {
    this.selectedQuiz = q;
  }

  addNewQuiz() {

    // Create the new quiz.
    const newQuiz: QuizDisplay = {
      name: "Untitled Quiz"
      , questions: []
    };

    // Create a new quiz list with the new quiz...
    //
    // a.k.a. "Add the new quiz to the list"
    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    // Select the newly added quiz.
    this.selectedQuiz = newQuiz; 
  }

  // Create new question list with the new question...
  //
  // a.k.a "Add the new question to the list"
  addNewQuestion() {
    this.selectedQuiz.questions = [
      ...this.selectedQuiz.questions
      , { name: "new question" }
    ];
    console.log("You've added a question!");
  }

  // Remove an existing question from the question list...
  // Note the question being passed in: it is the q object in the current *ngFor index from the template
  removeQuestion(removeCandidate: QuestionDisplay) {
    this.selectedQuiz.questions = this.selectedQuiz.questions.filter(
      // Output all the questions except this question (the one being passed to this method)
      x => x !== removeCandidate);
  }

  // Remove an existing quiz from the quiz list...
  deleteQuiz(deleteCandidate: QuizDisplay) {
    this.quizzes = this.quizzes.filter(
      // Output all the quizzes except this quiz (the one being passed into this method)
      x => x !== deleteCandidate);
  }

  // reset the state of the current quiz - basically stop viewing the deleted quiz.
  resetQuizState = () => {
    this.selectedQuiz = undefined;
  }

  serviceDown = false;

  ngOnInit() {

    this.qSvc.getQuizzes().subscribe(
      (data) => {
        console.log(data);

        this.quizzes = (<any[]> data).map(x => ({ 
          name: x.name
          , questions: x.questions
        }));
      }
      , (error) => {
        console.log(error);
        this.serviceDown = true;
      }
    );

  };

  title = 'quiz-editor';
  myWidth = 250;

  makeImageLarger() {
    this.myWidth *= 1.3;
  }

  // Read-only/getter property..
  get titleColor() {
    return this.myWidth > 400 
      ? "red" 
      : "blue";
  }

  promisesOne() {
    const n = this.qSvc.getNumberPromise(true);
    console.log(n); // ???

    const anotherNumberPromise = this.qSvc.getNumberPromise(false);
    console.log(anotherNumberPromise); // ??? Maybe ZoneAwarePromise

    anotherNumberPromise.then(
      number => console.log(number)
    ).catch(
      error => console.log(error)
    );

    n.then(
      number => {
        console.log(".then")
        console.log(number) // ???
      }
    ).catch(
      error => {
        console.log(".catch")
        console.log(error)
      }
    );
  }

  // async/await https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#Description
  async promisesTwo() {
    try {
      const n1= await this.qSvc.getNumberPromise(true);
      console.log(n1); // ??? what is n1, it's 42 from qSvc service 
      const n2 = await this.qSvc.getNumberPromise(false);
      console.log(n2);
    } catch (error) {
      console.log("catch block");
      console.log(error);
    }
  }

  async promisesThree() {
    // Parlor trick for concurrent promise execution...
    try {
      const n1 = this.qSvc.getNumberPromise(true);
      console.log(n1); // ??? this will be a promise
      const n2 = this.qSvc.getNumberPromise(true);
      console.log(n2); // ??? this will be a promise

      // give me an array of promises, I'll 
      // fire them all off at the same time, then wait until I hear 
      // back from both and output the results
      const results = await Promise.all([n1, n2]);
      console.log(results);

      // give me an array of promises, I'll
      // fire them all off at the same time, then wait until I hear
      // back from the first one that comes back and output that result
      const results2 = await Promise.race([n1, n2]);
      console.log(results2); 

      
    } catch (error) {
      console.log(error);
    }
  }
}
