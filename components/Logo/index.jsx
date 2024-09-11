import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    const waffleImg = '/img/button_h.png';

    return (
        <Link href="/" className="font-bold inline-flex items-center h-30 leading-5 p-2 mr-6 break-normal">
            <a
                className="flex items-center"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s ease-in-out',
                        transformOrigin: 'top', // Đặt điểm gốc tại trên cùng
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={waffleImg}
                        width={40}
                        height={40}
                        alt="logo"
                        style={{
                            transition: 'transform 0.3s ease-in-out',
                            transform: 'scaleY(1)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleY(0.5)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleY(1)'}
                    />
                </div>
                <h4 className="text-white ml-2">Nhat-Hao Tran</h4>
            </a>
        </Link>
    );
};

export default Logo;
