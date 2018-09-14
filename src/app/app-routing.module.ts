import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';

const routes: Routes = [
  { path: '',redirectTo: '/start:id/:domain',  pathMatch: 'full'},
  {path:'start/:id/:domain', component:StartQuizComponent},
  {path:'player/:id', component:PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [PlayerComponent, StartQuizComponent];
