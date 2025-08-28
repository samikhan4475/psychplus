interface DefaultImagePlaceholderIconProps {
  width?: number
  height?: number
}

export const DefaultImagePlaceholderIcon = ({ width = 25, height = 24 }: DefaultImagePlaceholderIconProps) => (
    <svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 9.00195C19.675 9.01395 20.853 9.11095 21.621 9.87895C22.5 10.758 22.5 12.172 22.5 15V16C22.5 18.829 22.5 20.243 21.621 21.122C20.743 22 19.328 22 16.5 22H8.5C5.672 22 4.257 22 3.379 21.122C2.5 20.242 2.5 18.829 2.5 16V15C2.5 12.172 2.5 10.758 3.379 9.87895C4.147 9.11095 5.325 9.01395 7.5 9.00195" stroke="#194595" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.5 14.998V1.99805M12.5 1.99805L15.5 5.49805M12.5 1.99805L9.5 5.49805" stroke="#194595" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)