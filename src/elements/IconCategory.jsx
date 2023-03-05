import React from 'react'
import {ReactComponent as IconFood} from '../img/cat_comida.svg'
import {ReactComponent as IconShopping} from '../img/cat_compras.svg'
import {ReactComponent as IconAccount} from '../img/cat_cuentas-y-pagos.svg'
import {ReactComponent as IconFun} from '../img/cat_diversion.svg'
import {ReactComponent as IconHome} from '../img/cat_hogar.svg'
import {ReactComponent as IconClothes} from '../img/cat_ropa.svg'
import {ReactComponent as IconHealt} from '../img/cat_salud-e-higiene.svg'
import {ReactComponent as IconTrasnport} from '../img/cat_transporte.svg'
import {ReactComponent as IconServices} from '../img/services.svg'
import {ReactComponent as IconGift} from '../img/regalo2.svg'

function IconCategory({id}) {


   const icons = {
      Comida: <IconFood/>,
      Compras: <IconShopping/>,
     "Cuentas y pagos": <IconAccount/>,
      Diversion: <IconFun/>,
      Hogar: <IconHome/>,
      Ropa: <IconClothes/>,
     "Salud e Higiene" :<IconHealt/>,
      Transporte: <IconTrasnport/>,
      Servicios: <IconServices/>,
      Regalo: <IconGift/>
   }
   return icons[id]
}

export default IconCategory;