import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPetsComponent } from './list-pets/list-pets.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';

const routes: Routes = [
  { path: '', component: ListPetsComponent },
  { path: 'new', component: NewPetComponent },
  { path: 'details/:id', component: PetDetailsComponent },
  { path: 'edit/:id', component: EditPetComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: ListPetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
