import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../service/Product/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../service/Product/product';
import { UserService } from '../service/User/user.service';
import { MensajeComponent } from '../mensaje/mensaje.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ProductList: Product[]=[]
  userName:string = ""

constructor(private productService: ProductService, private dialog: MatDialog,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.GetAllProducts().subscribe({
      next:(productsData)=>{
        this.ProductList = productsData.results
      },
      
      
    })
  }


  displayedColumns: string[] = ['name', 'descripcion', 'user', 'precio','buttons'];
  
  updatedUser(id:string): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {data: {id:id},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getProducts()
    })
  }

  deleteProduct(id:string){
    
    const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Eliminar producto",mensaje:"¿Seguro que desea eliminar el producto?"},})
    dialogRef.afterClosed().subscribe(result=>{
      if(result==true){
        this.productService.DeleteProduct(id).subscribe(()=>{
        this.getProducts()
        this._snackBar.open("Producto eliminado","Aceptar",{duration:3000})
        })

      }
      
    })
    
  }

  createProduct(){
    const dialogRef = this.dialog.open(ProductFormComponent, {data: {id:''},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getProducts()
    })
  }

  

  

  

}

