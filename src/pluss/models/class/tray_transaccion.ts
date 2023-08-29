export class TrayTransaccion {
  uuid: string;
  nombresApellidos: string;
  nroDocumento: string;
  celular: string;
  puntos: number;

  // static GenerateTrayHl(hls: Array<HojaLiquidacion>) {
  //   let items: Array<TrayHl> = [];
  //   hls.map((hl) => {
  //     let item: TrayHl = new TrayHl(hl);
  //     items.push(item);
  //   });
  //   return items;
  // }

  // constructor(hl: HojaLiquidacion) {
  //   this.uuid = hl.uuid;
  //   this.id = hl.id;
  //   this.codigoApm = hl.codigoApm;
  //   if (hl.vendedor.idTipoVendedor === 1 || hl.vendedor.idTipoVendedor === 2)
  //     this.nroDocumento = hl.vendedor.datosVendedor.nroDocumento;
  //   else this.nroDocumento = hl.vendedor.datosTipoVendedor.nim;
  //   if (hl.vendedor.idTipoVendedor === 1 || hl.vendedor.idTipoVendedor === 2)
  //     this.vendedor = `${hl.vendedor?.datosVendedor?.nombres} ${
  //       hl.vendedor?.datosVendedor?.paterno
  //         ? hl.vendedor?.datosVendedor?.paterno
  //         : ''
  //     } ${
  //       hl.vendedor?.datosVendedor?.materno
  //         ? hl.vendedor?.datosVendedor?.materno
  //         : ''
  //     }`;
  //   else this.vendedor = hl.vendedor.datosTipoVendedor?.razonSocial;
  //   this.origenMineral = hl.origenMineral
  //     ? `${hl.origenMineral?.municipio?.departamento} - ${hl.origenMineral?.municipio?.municipio} - ${hl.origenMineral?.municipio?.provincia}`
  //     : '';
  //   this.fechaTransaccion = hl.fechaTransaccion ? hl.fechaTransaccion : '';
  //   this.estado = hl.idEstadoHL;
  // }
}
