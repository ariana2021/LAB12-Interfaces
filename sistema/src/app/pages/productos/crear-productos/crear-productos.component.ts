import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {

  productoForm: FormGroup;
  imagenSeleccionada: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      producto: [null, Validators.required],
      categoria: [null, Validators.required],
      ubicacion: [null, Validators.required],
      precio: [null, Validators.required],
      imagen: [null, Validators.required]
    });
  }

  agregarProducto() {
    const PRODUCTO: Producto = {
      producto: this.productoForm.get('producto')!.value,
      categoria: this.productoForm.get('categoria')!.value,
      ubicacion: this.productoForm.get('ubicacion')!.value,
      precio: this.productoForm.get('precio')!.value,
      imagen: this.imagenSeleccionada! 
    };

    console.log(PRODUCTO);

    Swal.fire({
      title: 'Creacion de Producto',
      text: "¿Desea crear el producto?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
          console.log(data);
          this.router.navigate(['/listar-productos']);
        });
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.imagenSeleccionada = file;

      // Si quieres mostrar el nombre del archivo seleccionado
      console.log('Archivo seleccionado:', file.name);
    }
  }
}