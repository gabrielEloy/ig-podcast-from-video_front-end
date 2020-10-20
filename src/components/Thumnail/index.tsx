import React from 'react'
import './styles.css'
export interface ThumbnailProps {
    data?: {
        owner: {
            profile_pic_url: string;
            username: string;
            full_name: string;
        }
        thumbnail: string
    }
}

 //@ts-ignore
export const Thumbnail = ({ data }: ThumbnailProps) => {
    return (
        <div className="thumbnail__container">
            <div className="thumbnail__header">
                <img className="thumbnail__profile-pic" src={data?.owner.profile_pic_url} alt={`${data?.owner.full_name} instagram's profile pic`} />
                <p className="thumbnail__profile-name">{`${data?.owner.username}`}</p>
            </div>
            <div className="thumbnail__image">
                <img src={data?.thumbnail} alt="teste"/>
            </div>
        </div>
    )
}
