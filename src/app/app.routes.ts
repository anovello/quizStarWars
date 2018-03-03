import {Routes} from '@angular/router'

import { HomeComponent } from './home/home.component'
import { QuizComponent } from './quiz/quiz.component'
import { RankingComponent } from './ranking/ranking.component'

export const ROUTES: Routes = [
	{path: '', component: HomeComponent},
	{path: 'quiz', component: QuizComponent},
	{path: 'ranking', component: RankingComponent}
]