import { Component, Inject } from '@angular/core';
import { Product } from '../service/Product/product';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../service/Product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsComponent } from '../products/products.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { UpdateProductRequest } from '../service/Product/updateProductRequest';
import { CreateProductRequest } from '../service/Product/createProductRequest';
import { AuthService } from '../service/Auth/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
 product:Product = {name:"",descripcion:"",id:"",imagen:"",precio:0,user:""}
 

  productForm = this.formBuilder.group({
    name: ['',Validators.required],
    descripcion: ['',[Validators.required]],
    imagen: ['',Validators.required],
    precio: [0,Validators.required]
    
  })

  constructor(private productService:ProductService,private authService:AuthService, private formBuilder: FormBuilder,private _snackBar: MatSnackBar,public dialogRef:MatDialogRef<ProductsComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogConfig){
  }
  ngOnInit(): void {
    if(this.data.id != undefined){
      this.productService.GetProduct(this.data.id).subscribe({
        next: (productData) =>{
          this.product = productData;
        }
      })
    }else{
      
    }
    
  }
  



  updateProduct(){
    this.productService.UpdateProduct(this.data.id+"",{name:this.productForm.get("name")?.value,descripcion:this.productForm.get("descripcion")?.value,imagen:this.productForm.get("imagen")?.value,precio:this.productForm.get("precio")?.value} as UpdateProductRequest).subscribe({
      complete:()=>{
        this._snackBar.open("Producto actualizado","Aceptar",{duration:3000})
        this.dialogRef.close()
      },
      error: (errorData) =>{
          this._snackBar.open(errorData.message,"Aceptar",{duration:2000})
      }
      
      
    })
  }

  createProduct(){
    this.productService.CreateProduct({name:this.productForm.get("name")?.value,descripcion:this.productForm.get("descripcion")?.value,imagen:this.productForm.get("imagen")?.value,precio:this.productForm.get("precio")?.value,user:this.authService.currenUserData.getValue().id} as CreateProductRequest).subscribe({
      complete:()=>{
        this._snackBar.open("Producto creado","Aceptar",{duration:3000})
        this.dialogRef.close()
      },
      error: (errorData) =>{
          this._snackBar.open(errorData.message,"Aceptar",{duration:2000})
      }
    })
  }
}


