import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  }

  getPets() {
    console.log("Get all pets data in Service")
    return this._http.get('/pets');
  }

  getPetByID(ID) {
    console.log("Get pets data by _id in Service", ID)
    return this._http.get('/pets/' + ID);
  }

  createPet(newPet) {
    console.log("Post/create pets data in Service", newPet)
    return this._http.post('/pets', newPet);
  }

  updatePetByID(ID, updatePet) {
    console.log("Put/update pets data by _id in Service", ID, updatePet)
    return this._http.put('/pets/' + ID, updatePet);
  }

  deletePetByID(ID) {
    console.log("Delete pets data by _id in Service", ID)
    return this._http.delete('/pets/' + ID);
  }

}
