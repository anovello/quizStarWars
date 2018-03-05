import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Img } from './img';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { QuizService } from '../quiz/quiz.service';
import { FormBuilder } from '@angular/forms/src/form_builder';

@Component({
  selector: 'mt-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() people: any
  @Input() page: any

  name = new FormControl();

  img: string = '';
  id: string = '';

  constructor(public imgs: Img,
              public ngxSmartModalService: NgxSmartModalService,
              private quizService: QuizService) {
  }

  ngOnInit() { 
    this.img = this.getImg(this.people.name);
    this.id = (this.getImg(this.people.name, 'name')).replace(" ","");
    this.name.setValue(this.people.nameValid);
    
    if (this.name.value !== undefined)
    {
      this.name.disable();
    }
  }

  getImg(nameImg, type = 'link')
  {
    let res = this.imgs.links.find(o => o.name === nameImg.replace(/^\s+/,""));

    if (type === 'link')
    {
      return res.link;
    } else {
      return res.name;
    }
    
  }

  modal()
  {
    if( this.people.movies === undefined )
    {
      let mov = this.people.films.length,
          mov2 = 0,
          movies = '';

      this.people.films.forEach(element => {
  
        this.quizService.get(element).subscribe(res => {
          
          if (movies == '')
          {
            movies = res.title;
          } else{
            let mov = movies.concat(', ', res.title);
            movies = mov;
          }

          mov2++;

          if(mov2 === mov)
          {
            this.people = this.quizService.setParam(this.page, 'movies', movies, this.people.name);
          }
        });
      });
      
    }

    if ( this.people.veh === undefined)
    {
      let ve = this.people.vehicles.length,
          ve2 = 0,
          vehicles = '';

      this.people.vehicles.forEach(element => {
        
        this.quizService.get(element).subscribe(res => {
          
          if (vehicles == '')
          {
            vehicles = res.name;
          } else{
            let vehi = vehicles.concat(', ', res.name);
            vehicles = vehi;
          }
    
          ve2++;
    
          if(ve === ve2)
          {
            this.people = this.quizService.setParam(this.page, 'veh', vehicles, this.people.name);
          }
        });
      });
    }

    if ( this.people.specie === undefined)
    {
      let sp = this.people.species.length,
          sp2 = 0,
          species = '';

      this.people.species.forEach(element => {
        
        this.quizService.get(element).subscribe(res => {
          
          if (species == '')
          {
            species = res.name;
          } else{
            let re = species.concat(', ', res.name);
            species = re;
          }
    
          sp2++;
    
          if(sp2 === sp)
          {
            this.people = this.quizService.setParam(this.page, 'specie', species, this.people.name);
          }
        });
      });
    }

    if ( this.people.planet === undefined)
    {
      this.quizService.get(this.people.homeworld).subscribe(res => {
        this.people = this.quizService.setParam(this.page, 'planet', res.name, this.people.name);
      });
        
    }

    this.ngxSmartModalService.getModal(this.id).open();
  }

  updateInput()
  {  
    if (this.name.value !== undefined && this.name.value.trim() !== '')
    {
      this.people = this.quizService.setParam(this.page, 'nameValid', this.name.value, this.people.name, false);
      this.name.disable();
    } else if(this.name.value.trim() === '')
    {
      this.name.setValue('');
    }
  }
  

}
