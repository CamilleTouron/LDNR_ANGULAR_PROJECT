import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Chasseur } from '../service-chasseurs/chasseur';
import { ChasseursService } from '../service-chasseurs/chasseurs.service';
import { Numero } from '../service-pilotes/numero';
import { Pilote } from '../service-pilotes/pilote';
import { PilotesService } from '../service-pilotes/pilotes.service';

@Component({
  selector: 'app-gestion-chasseurs',
  templateUrl: './gestion-chasseurs.component.html',
  styleUrls: ['./gestion-chasseurs.component.css']
})
export class GestionChasseursComponent implements OnInit {
  chasseurs: Chasseur[] = [];
  pilotes: Pilote[] = [];
  chasseurrechercher: Chasseur = { ChasseurID: 0, Modele: "", Etat: "", PiloteID: 0 };
  chasseurmodifier: Chasseur = { ChasseurID: 0, Modele: "", Etat: "", PiloteID: 0 };
  checked :boolean=false;
  textechasseur : string = "Cliquer pour afficher uniquement les chasseurs opérationnels.";
  textenbchasseur : string = "";

  constructor(private cs: ChasseursService,private ps : PilotesService) { }

  ngOnInit(): void {
    this.majChasseur();
  }
  majChasseur(): void {
    this.cs.getChasseur().subscribe(
      (chasseurs: Chasseur[]) => {
        // La valeur reçue est la nouvelle liste à afficher
        this.chasseurs = chasseurs;
        this.chasseurrechercher.ChasseurID = 0;
        this.checked=false;
        this.textechasseur = "Cliquer pour afficher uniquement les chasseurs opérationnels.";
        this.textenbchasseur = "";
        //console.log(this.chasseurs);
      },
      (err) => { }
    )
    this.ps.getPilotes().subscribe(
      (pilotes: Pilote[]) => {
        // La valeur reçue est la nouvelle liste à afficher
        this.pilotes = pilotes;
        //console.log(this.pilotes);
      },
      (err) => {}
    )
  }

  formValueToChasseur(formValue: any): Chasseur {
    return formValue as Chasseur;
  }
  //Fonction ajouter un chasseur.
  ajouterChasseur(form: NgForm,form_num: NgForm) {
    //console.log(form.value);
    this.cs.addChasseur(this.formValueToChasseur(form.value))
      .subscribe(
        (value) => { this.majChasseur(); }
      );
    this.affecter(form_num,this.formValueToChasseur(form.value));
    this.majChasseur();
    form.resetForm();

  }

  formValueToNumber(formValue: any): Numero {
    return formValue as Numero;
  }

  //Fonction afficher chasseur par id.
  rechercherChasseur(form: NgForm) {
    let id = this.formValueToNumber(form.value);
    for (let chasseur of this.chasseurs) {
      if (chasseur.ChasseurID == id.num) {
        this.chasseurrechercher = chasseur;
      }
    }
  }
  //Fonction qui permet de modifier l'etat d'un chasseur.
  modifierEtatChasseur(ch: Chasseur) {
    this.chasseurmodifier = ch
    //console.log(ch);
    switch (this.chasseurmodifier.Etat) {
      case "operationnel":
        this.chasseurmodifier.Etat = "en maintenance";
        break;
      case "en maintenance":
        this.chasseurmodifier.Etat = "operationnel";
        break;
      case "detruit":
        break;
      default:
        this.chasseurmodifier.Etat = "en maintenance";
        break;
    }
    this.cs.modifyChasseur(this.chasseurmodifier).subscribe(
      (value) => this.majChasseur()
    );
  }
  //Fonction qui détruit le chasseur
  detruire(ch: Chasseur) {
    this.chasseurmodifier = ch
    //console.log(ch);
    this.chasseurmodifier.Etat = "detruit";
    this.chasseurmodifier.PiloteID = 0;
    this.cs.modifyChasseur(this.chasseurmodifier).subscribe(
      (value) => this.majChasseur()
    );
  }

  //Fonction qui permet d'affecter un chasseur à un pilote.
  affecter(form: NgForm , ch :Chasseur) {
    let id = this.formValueToNumber(form.value);
    let i=0;
    //console.log(ch); 
    for(let chasseur of this.chasseurs){
      if(id.num==0){
        return ;
      }
      if(id.num==chasseur.PiloteID){
        alert("Le pilote "+ id.num +" est déjà affecté à un chasseur.");
        return ;
      }
    }
    for(let pilote of this.pilotes){
      //console.log("coucou");
      if(id.num==pilote.PiloteID){
        console.log(id.num);
        this.chasseurmodifier=ch;
        this.chasseurmodifier.PiloteID=id.num;
        this.cs.modifyChasseur(this.chasseurmodifier).subscribe( (value) => this.majChasseur());
        i=1;
        return ;
      }
    }
    if(i==0){
      alert("L'id que vous venez de saisir n'existe pas.");
    }
  }

  //Fonction qui permet de dissocier un chasseur à un pilote?
  dissocier(ch: Chasseur) {
    //console.log("coucou");
    this.chasseurmodifier = ch
    //console.log(ch);
    this.chasseurmodifier.PiloteID = 0;
    this.cs.modifyChasseur(this.chasseurmodifier).subscribe(
      (value) => this.majChasseur()
    );
  }
  //Fonction qui change le tableau des chasseurs pour en contenir que les operationnels.
changeTableau(){
  switch (this.checked){
    case true : 
      this.majChasseur();
      this.checked=false;
      break;
    case false :
      for(let chasseur of this.chasseurs){
        this.chasseurs = this.chasseurs.filter(chasseur => chasseur.Etat=="operationnel");
        this.textechasseur="Cliquer pour afficher tout les chasseurs.";
        this.textenbchasseur="Il y a "+this.chasseurs.length+" chasseur(s) opérationnel(s).";
      }
      this.checked=true;
      break;
  }

}
}
