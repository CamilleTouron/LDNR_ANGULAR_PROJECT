import { Injectable } from '@angular/core';
import {Pilote} from './pilote';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PilotesService {
  // La partie http://localhost:3000 doit pouvoir se configurer
  // dans les fichiers de config Angular, mais ici c'est simple
  // à comprendre.
  private piloteUrl = 'http://localhost:3000/api/Pilotes';
  // options nécessaires pour certains appels http
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  /**
   * Gestionnaire d'erreur pour un observable
   * Retourne un résultat pour ne pas bloquer:
   *  Soit le result fourni en paramètre
   *  Soit null si pas fourni
   * @param operation Le nom de l'opération qui a echoué.
   * @param result    Valeur qui sera retournée par l'observable au final.
   */
  private handleError<P>(operation = 'operation', result?: P) {
    return (error: any): Observable<P> => {
      console.log(error);
      console.log(`Pilote app: Problème avec ${operation} - ${error.message}`);

      return of(result as P);
    }
  }

  /**
   * Inscrire un rebelle
   * 
   **/
  addPilote(pilote: Pilote): Observable<Pilote> {
    /*
      Retourne l'observable qui fournira la création du Pilote.
        Le pipe permet de modifier l'observable reçu
        et retourne un nouvel observable (par application des différentes
        opérations, ici tap, catchError)
       Note : http.put() a les mêmes options http.post()
    */
    console.log(pilote);
    return this.http.post<Pilote>(this.piloteUrl, pilote, this.httpOptions)
      .pipe(
        tap((piloteCree: Pilote) => console.log(`Pilote créé id=${piloteCree.PiloteID}`)),
        catchError(this.handleError<Pilote>('addPilote'))
      );
  }

  /**
   * Retourne la liste des pilotes en base sous forme de tableau
   *
   **/
  getPilotes(): Observable<Pilote[]> {
    return this.http.get<Pilote[]>(this.piloteUrl)
      .pipe(catchError(this.handleError<Pilote[]>('getPilote')));
  }

  /**
 * Supprime le pilote de la base
 * @param pilote le pilote à supprimer 
 */
  deletePilote(pilote: Pilote): Observable<Pilote> {
    const url = this.piloteUrl + '/' + pilote.PiloteID;
    return this.http.delete<Pilote>(url, this.httpOptions).pipe(
      catchError(this.handleError<Pilote>('deletePilote'))
    );
  }
}
