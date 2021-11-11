import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Chasseur } from './chasseur';

@Injectable({
  providedIn: 'root'
})
export class ChasseursService {
  // La partie http://localhost:3000 doit pouvoir se configurer
  // dans les fichiers de config Angular, mais ici c'est simple
  // à comprendre.
  private chasseurUrl = 'http://localhost:3000/api/Chasseurs';
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
  private handleError<C>(operation = 'operation', result?: C) {
    return (error: any): Observable<C> => {
      console.log(error);
      console.log(`Chasseur app: Problème avec ${operation} - ${error.message}`);
      return of(result as C);
    }
  }

  /**
   * Ajoute un chasseur
   * 
   **/
  addChasseur(chasseur: Chasseur): Observable<Chasseur> {
    /*
      Retourne l'observable qui fournira la création du Chasseur.
        Le pipe permet de modifier l'observable reçu
        et retourne un nouvel observable (par application des différentes
        opérations, ici tap, catchError)
       Note : http.put() a les mêmes options http.post()
    */
    console.log(chasseur);
    return this.http.post<Chasseur>(this.chasseurUrl, chasseur, this.httpOptions)
      .pipe(
        tap((chasseurCree: Chasseur) => console.log(`Chasseur créé id=${chasseurCree.PiloteID}`)),
        catchError(this.handleError<Chasseur>('addChasseur'))
      );
  }

  /**
   * Retourne la liste des chasseurs en base sous forme de tableau
   *
   **/
  getChasseur(): Observable<Chasseur[]> {
    return this.http.get<Chasseur[]>(this.chasseurUrl)
      .pipe(catchError(this.handleError<Chasseur[]>('getChasseur')));
  }

  /**
 * Supprime le chasseur de la base
 * @param chasseur le chasseur à supprimer 
 */
  deleteChasseur(chasseur: Chasseur): Observable<Chasseur> {
    const url = this.chasseurUrl + '/' + chasseur.ChasseurID;
    return this.http.delete<Chasseur>(url, this.httpOptions).pipe(
      catchError(this.handleError<Chasseur>('deleteChasseur'))
    );
  }

  /**
 * Modifie le chasseur de la base
 */
    modifyChasseur(chasseur: Chasseur): Observable<Chasseur> {
    console.log(chasseur.PiloteID);
    const url = this.chasseurUrl + '/' + chasseur.ChasseurID;
    return this.http.patch<Chasseur>(url,chasseur, this.httpOptions).pipe(
      catchError(this.handleError<Chasseur>('modifyChasseur'))
    );
  }
}