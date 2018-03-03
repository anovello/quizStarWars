import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'mt-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  
  count: number = 120;
  time: string = '00:00';
  page: number = 1;
  peoples: any = [];
  points: any;

  rForm: FormGroup
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  constructor(private quizService: QuizService,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder,
              private router: Router) 
  {
    quizService.getPeople(this.page).subscribe(items => {
      quizService.setPeople(items, this.page);
        this.peoples = quizService.peoples;
        this.start();
    });

    this.rForm = this.formBuilder.group({
			name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
			email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
		});
  }

  ngOnInit() { }

  start()
  {
    if ( (this.count - 1) >= 0)
    {
      this.count = this.count-1;
      this.time = ("0" + Math.floor(this.count / 60)).slice(-2)+':'+("0" + Math.floor(this.count % 60)).slice(-2);

      let timeout = setTimeout(() => {  
        this.start()
      }, 1000);
    } else {
      this.last()
    }
  }

  previous()
	{
    if (this.page > 1)
    {
      this.page = this.page -1;
      this.peoples = [];
      this.peoples = this.quizService.peoples;
    }
  }
  
  next()
	{
    let page = this.page + 1;
    
    if (this.quizService.peoples[page] === undefined)
    {
      this.quizService.getPeople(page).subscribe(items => {
        this.quizService.setPeople(items, page);
        this.peoples = [];
        this.peoples = this.quizService.peoples;
        this.page = page;
      })
    } else {
      this.page = page;
    }
  }
  
  reload()
  {
    window.location.reload();
  }

  last()
  {
    this.points = this.quizService.getPoints();
    this.ngxSmartModalService.getModal('modal').open();
  }

  save()
  {
    this.quizService.setRanking(this.rForm.value.name, this.rForm.value.email, this.points);
    this.ngxSmartModalService.getModal('modal').close();
    this.router.navigate(['/ranking']);
  }

}
