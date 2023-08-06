import Thumbnail from '../assets/images/thumbnail.jpg';
export default function VideoCard() {
  return (
    <>
      <div className="flex flex-col hover:cursor-pointer rounded">
        <img src = {Thumbnail} alt="thumbnail" className="rounded"/>
        <span>Dhruv Karavdiya</span>
        <div><span>1 mil views</span><span> . </span><span>10 months ago</span></div>
      </div>
    </>
  );
}
