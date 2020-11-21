import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './global';

@Injectable()
export class DataService{
  public url:string;

  constructor(private http:HttpClient){
    this.url=GLOBAL.url;
  }

  getData(){
    return this.http.get(this.url+'data.php').toPromise();
  }

  insertData(_motivo:any,_des_motivo:string,_estado:any,_tipo:any){
    return this.http.post(this.url+'data.php',{motivo:_motivo,des_motivo:_des_motivo,estado:_estado,tipo:_tipo}).toPromise();
  }

  updateData(_motivo:any,_des_motivo:string,_estado:any,_tipo:any){
    return this.http.put(this.url+'data.php',{motivo:_motivo,des_motivo:_des_motivo,estado:_estado,tipo:_tipo}).toPromise();
  }

  deleteData(_motivo:any){
    return this.http.delete(this.url+'data.php/?motivo='+_motivo).toPromise();
  }
}
