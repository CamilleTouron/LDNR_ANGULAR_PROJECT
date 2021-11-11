import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionChasseursComponent } from './gestion-chasseurs/gestion-chasseurs.component';
import { GestionPilotesComponent } from './gestion-pilotes/gestion-pilotes.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'gestion-chasseurs',component:GestionChasseursComponent},
  {path:'gestion-pilotes',component:GestionPilotesComponent},
  {path:'home',component:HomeComponent},
  //Root pour les chemins qui n'existent pas :
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
