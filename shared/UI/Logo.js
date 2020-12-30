import Link from 'next/link'
import Image from 'next/image'


export default function Logo(props) {
    return (
        <div className={props.className}>
            <Link href="/">
                <a>
                    <Image src='/logo.png' alt="logo" width="78.52" height="64"/>
                </a>
            </Link>
        </div>
    )
}
