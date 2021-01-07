import Link from 'next/link'

export default function Button(props) {

    if (props.href) {
        return (
          <Link
            href={props.href}>
          <a  className={props.classes}>
              {props.children}
          </a>
          </Link>
        );
    }

    return (

            <button type={props.type} className={props.classes} onClick={props.click} disabled={props.disabled}>{props.children}</button>
        
    )
}
