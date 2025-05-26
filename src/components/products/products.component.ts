import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { Product } from 'src/service/Product/product';
import { ProductService } from 'src/service/Product/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserService } from 'src/service/User/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ProductList: Product[]=[]
  userName:string = ""

constructor(private productService: ProductService, private userService: UserService,private dialog: MatDialog,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.GetAllProducts().subscribe({
      next:(productsData)=>{
        this.ProductList = productsData.results

        this.ProductList.forEach(product => {
          this.userService.GetUser(product.user).subscribe({
          next:(userData)=>{
            product.user = userData.email
            
          },
        });
        })
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
    
    const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Eliminar producto",mensaje:"¿Seguro que desea eliminar el producto?",aceptar:"Eliminar",cancelar:"Cancelar"},})
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

