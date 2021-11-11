import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Pilote } from '../service-pilotes/pilote';
import { PilotesService } from '../service-pilotes/pilotes.service';
import { Numero } from '../service-pilotes/numero';

@Component({
  selector: 'app-gestion-pilotes',
  templateUrl: './gestion-pilotes.component.html',
  styleUrls: ['./gestion-pilotes.component.css']
})
export class GestionPilotesComponent implements OnInit {
  pilotes: Pilote[] = [];
  piloterechercher : Pilote={PiloteID:0,Nom:"",Prenom:"",Race:"",Age:800};
  
  constructor(private ps: PilotesService) { }

  ngOnInit(): void {
    this.majPilote();
  }
  majPilote(): void {
    this.ps.getPilotes().subscribe(
      (pilotes: Pilote[]) => {
        // La valeur reçue est la nouvelle liste à afficher
        this.pilotes = pilotes;
        this.piloterechercher.PiloteID=0;
        console.log(this.pilotes);
      },
      (err) => {}
    )
  }

  formValueToPilote(formValue: any): Pilote {
    return formValue as Pilote;
  }
  //Fonction inscrire pilote.
  inscrirePilote(form: NgForm) {
    console.log(form.value);

    this.ps.addPilote(this.formValueToPilote(form.value))
      .subscribe(
        (value) => {this.majPilote();}
      );
      this.majPilote();
      form.resetForm();
  }

  formValueToNumber(formValue : any) : Numero{
    return formValue as Numero;
  }

  //Fonction afficher pilote par id.
  rechercherPilote(form : NgForm ){
    let id = this.formValueToNumber(form.value);
    for(let pilote of this.pilotes){
      if(pilote.PiloteID==id.num){
        this.piloterechercher=pilote;
     }
    }
  }
}
