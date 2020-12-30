import {createPortal} from 'react-dom'

import 'shared/UI/Backdrop.module.css'

export default function Backdrop({OnCloseBackdrop}) {

    const backdrop = <div onClick={OnCloseBackdrop} className='backdrop-Open'>

                     </div>

    return createPortal(backdrop, document.getElementById('backdrop-hook'))
    
}
