import LogoImg from '../assets/logo.svg';
import ProfileImg from '../assets/profile.svg';

function Sidebar() {
  return (
    <div className="lg:h-full min-h-12 min-w-28 w-full lg:w-fit flex lg:flex-col justify-between items-center lg:items-start">
      <div className="cursor-pointer w-24 lg:w-28 xl:w-32">
        <img src={LogoImg} alt="logo" />
      </div>
      <div className="h-12 w-12 bg-white/10 rounded-full">
        <img src={ProfileImg} alt="" />
      </div>
    </div>
  );
}

export default Sidebar;
