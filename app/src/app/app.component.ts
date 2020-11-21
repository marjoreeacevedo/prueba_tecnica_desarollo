import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from './services/data.service';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['motivo', 'des_motivo', 'estado', 'tipo','acciones'];
  public dataSource=[];
  public motivo:any=[];
  public new=false;
  public edit=false;
  public filterData=[];
  public filterValue:any="";
  public arrowDown:boolean=false;
  constructor(public _dataService:DataService){
    this.getData();

  }

  filter(event:Event){
    const filter = (event.target as HTMLInputElement).value;
    let temp:any=[];
    for(let d in this.dataSource){
      let dato= this.dataSource[d]['des_motivo'];
      if(dato){
        if((dato as string).trim().toLowerCase().indexOf(filter)!==-1){
          temp.push(this.dataSource[d]);
          break;
        }
      }
    }
    this.filterData=temp;
  }

  async getData(){
    let res:any= await this._dataService.getData();
    this.dataSource=res['data'];
    this.filterData=this.dataSource;
  }

  save(){
    this.new=false;
    if(this.edit==true){
      this.update();
    }else{
      this.insert();
    }
  }

  cancel(){
    this.new=false;
  }

  async insert(){
    let res:any = await this._dataService.insertData(this.motivo.motivo,this.motivo.des_motivo,this.motivo.estado,this.motivo.tipo);
    if(res['status']=="200"){
      alert('Nuevo motivo insertado correctamente');
      this.getData();      
    }
  }

  async update(){
    let res:any=await this._dataService.updateData(this.motivo.motivo,this.motivo.des_motivo,this.motivo.estado,this.motivo.tipo);
    if(res['status']=="200"){
      alert('Motivo editado correctamente');
      this.getData();
    }
  }

  async view(type:any,element:any){
    this.new=true;
    if(type==1){
      this.edit=true;
      this.motivo=this.clone(element);
    }else{
      this.motivo=[];
      this.edit=false;
    }
  }

  clone(_item:any):any{
    return JSON.parse(JSON.stringify(_item));
  }

  clearFilter(){
    this.filterValue=null;
    this.filterData=this.dataSource;
  }

  async delete(motivo:any){
    let res:any= await this._dataService.deleteData(motivo);
    if(res['status']=="200"){
      alert('Motivo eliminado');
      this.getData();
    }
  }

  order(){
    this.arrowDown=true;
    let temp:any=[];
    for(let d in this.dataSource){
      temp.push(this.dataSource[d]);
    }
    temp.sort(function(a:any, b:any) {
      var nameA = a.des_motivo.toUpperCase();
      var nameB = b.des_motivo.toUpperCase();
      if (nameA < nameB) {
        return -1;   }
        if (nameA > nameB) {
          return 1;
        }

        return 0;

      });
      this.filterData=temp;
    }
    restartOrder(){
      this.arrowDown=false;
      this.getData();
    }
  }
