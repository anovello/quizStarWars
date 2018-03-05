import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map';

@Injectable()
export class QuizService{
	
	peoples: any = [];
	points: number = 0;
	ranking: any;

	constructor(private http: HttpClient){}

	getPeople(page)
	{	
		return this.http.get<any>(`https://swapi.co/api/people/?page=`+page)
    }
    
    setPeople(json, page)
    {
        if ( this.peoples[page] === undefined)
        {
            this.peoples[page] = json.results;
        }
	}

	get(link)
	{
		return this.http.get<any>(link)
	}

	setParam(page, index, param, id, visualized = true)
	{
		this.peoples[page];

		let people = this.peoples[page].find(o => o.name === id.replace(/^\s+/,""));
		
		if (people.visualized === undefined && visualized === true)
		{
			people.visualized = true;
		}
		
		if (index === 'movies')
		{
			people.movies = param;
			return people;
		}

		if (index === 'veh')
		{
			people.veh = param;
			return people;
		}

		if (index === 'specie')
		{
			people.specie = param;
			return people;
		}

		if (index === 'planet')
		{
			people.planet = param;
			return people;
		}

		if (index === 'nameValid')
		{
			people.nameValid = param;
			return people;
		}
	}

	getPoints()
	{
		this.peoples.forEach(element => {
			element.forEach(el => {

				if (el.nameValid !== undefined && (el.nameValid.toLowerCase().trim() === el.name.toLowerCase().trim() ))
				{
					if (el.visualized === true)
					{
						this.points += 5;
					} else {
						this.points += 10;
					}
				}
			});
		});

		return this.points;
	}

	setRanking(name, email, points)
	{
		if (localStorage.getItem('ranking') ===  null || localStorage.getItem('ranking') === undefined)
		{
			this.ranking = [
				{name: name, email: email, points: points}
			];

			localStorage.setItem('ranking', JSON.stringify(this.ranking));

			return true;
		} else {
			this.ranking = JSON.parse(localStorage.getItem('ranking'));
			this.ranking.push({name: name, email: email, points: points});

			this.ranking.sort(function (a, b) {
				if (a.points < b.points) {
					return 1;
				}
				if (a.points > b.points) {
					return -1;
				}
				
				return 0;
			});

			localStorage.setItem('ranking', JSON.stringify(this.ranking));
			return true;
		}
	}

	getRanking()
	{
		return JSON.parse(localStorage.getItem('ranking'));
	}
	
}