import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/features/products/models/product.model';
import { MensajeComponent } from '../../../../shared/components/mensaje/mensaje.component';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() productCard!: Product;

  buyForm = this.formBuilder.group({
    cantidad: [0, [Validators.required, Validators.min(1)]],
  });
  cantidadActual: number = 0;

  ngOnInit(): void {
    this.getStock();
  }

  constructor(
    private stockService: StockService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  comprar() {
    if (this.buyForm.valid) {
      this.stockService
        .UpdateStock(this.productCard.id, {
          cantidad:
            this.cantidadActual - (this.buyForm.value.cantidad as number),
        })
        .subscribe({
          error: (errorData) => {
            this.dialog.open(MensajeComponent, {
              data: {
                titulo: 'Error en la compra',
                mensaje: errorData.message,
                aceptar: 'Aceptar',
              },
            });
          },
          complete: () => {
            this.buyForm.reset();
            this.dialog.open(MensajeComponent, {
              data: {
                titulo: 'Compra exitosa!',
                mensaje: 'La compra fue realizada con exito',
                aceptar: 'Aceptar',
              },
            });
            this.getStock();
          },
        });
    }
  }

  getStock() {
    this.stockService.GetStock(this.productCard.id).subscribe({
      next: (ProductStockData) => {
        this.cantidadActual = ProductStockData.cantidad;
      },
    });
  }
}
