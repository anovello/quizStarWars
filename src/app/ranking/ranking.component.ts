import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';
import { Router } from "@angular/router";

@Component({
  selector: 'mt-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  ranking: any

  constructor(private quizService: QuizService,
              private router: Router) { }

  ngOnInit() {
    this.ranking = this.quizService.getRanking();
  }

}
