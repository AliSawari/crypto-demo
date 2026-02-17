import Image from "next/image";

export const DynamicLogo = ({ s, w, h}: { s: string, w?: number, h?: number}) => {
  const [srcName] = s.toLowerCase().split('usdt');
  return <Image src={`/img/${srcName}.png`} width={w ?? 20} height={h ?? 20} alt={`${srcName}`} style={{alignSelf: 'center'}} />
}