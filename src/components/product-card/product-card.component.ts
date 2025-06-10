import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/service/Product/product';
import { ProductService } from 'src/service/Product/product.service';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() productCard!:Product

  buyForm = this.formBuilder.group({
      cantidad:[0,[Validators.required,Validators.min(1)]],
    })
  cantidadActual:number = 0

    ngOnInit(): void {
      this.getStock();
      
    }

  constructor(private productService:ProductService ,private formBuilder:FormBuilder, private dialog:MatDialog){}

  comprar(){
    if(this.buyForm.valid){

      this.productService.UpdateProductStock(this.productCard.id,this.cantidadActual - (this.buyForm.value.cantidad as number)).subscribe({
        error: (errorData) =>{
          console.log("Error")
        },
        complete: () =>{
          this.buyForm.reset();
          const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Compra exitosa!",mensaje:"La compra fue realizada con exito",aceptar:"Aceptar",cancelar:""},})
          this.getStock()
          
        }
      }
      )
    }
  }

  getStock(){
    this.productService.GetProductWhitStock(this.productCard.id).subscribe({
        next:(ProductStockData)=>{
          this.cantidadActual = ProductStockData.stock.cantidad
        },
       
        
    })
  }
}

