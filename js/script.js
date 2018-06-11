/*header*/
var $headerGallery = document.getElementById("header-image-gallery");
var $headerImage = $headerGallery.querySelectorAll(".header-image");

var selectedImage = 0;

function gallery ()
{
    console.log("click")
    for (var i = 0; i < $headerImage.length; i++)
    {
        $headerImage[i].style.opacity = "0"
    }
    selectedImage = selectedImage+1
    $headerImage[selectedImage].style.opacity = "1"
    if (selectedImage === $headerImage.length - 1)
    {
        selectedImage = -1;
    }
}

$headerGallery.addEventListener("click", gallery);

//-------------------------------------------------------------------------

/*storyline*/
var $gallery = document.getElementById('storyline');
var $view = $gallery.querySelector('#story-view-box');
var $viewContainer = $view.querySelector('#story-container');
var $viewItem = $viewContainer.querySelectorAll('.story-box');
var $list = $gallery.querySelector('#story-btn');
var $listItem = $list.querySelectorAll('a');


//갤러리의 width 값.
var _galleryW = 968;
var _cuId = 0;
var _exId = 0;

//전체 이미지의 개수.
var _max = $viewItem.length;

function galleryResize()
{
    $viewContainer.style.width = _galleryW * _max + 'px';
    for(var i = 0; i < $viewItem.length; i++)
    {
        $viewItem[i].style.width = _galleryW + 'px';
    }
}
function gallerySlide()
{
    var duration = 400 + 100 * Math.abs(_cuId - _exId);
    $viewContainer.style.transform = 'translate3d('+ _galleryW * _cuId * -1 + 'px, 0, 0)';
    $viewContainer.style.transitionProperty = 'transform';

    $viewContainer.style.transitionDuration = duration + 'ms';

    $viewContainer.style.transitionTimeFunction = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
}
$viewContainer.addEventListener('transitionend', function()
{
    $viewContainer.style.transitionProperty = null;
    $viewContainer.style.transitionDuration = null;
    $viewContainer.style.transitionTimeFunction = null;
});

function listClick(id){
    function onClickList(event)
    {
        event.preventDefault();
        var $el = this, $parent = $el.parentElement;
        if(!$parent.classList.contains('selected'))
        {
            _cuId = id;
            $listItem[_exId].parentElement.classList.remove('selected');
            $parent.classList.add('selected');
            //////
            for (var i = 0; i < $viewItem.length; i++)
            {$viewItem[i].style.opacity = "0";}
            $viewItem[_cuId].style.opacity = "1";
            //////
            gallerySlide();
            //////
            _exId = _cuId;
        }
    }
    $listItem[id].addEventListener('click', onClickList);
}


//초기화.
function init()
{
    galleryResize();
    for(var i = 0; i < $listItem.length; i++)
    {
        listClick(i);
    }
}
init();

//-------------------------------------------------------------------------

/*character*/

var $menu = document.getElementById('character-container');
var $menuItems = $menu.querySelectorAll('.character');
var $menuItemsEl = $menu.querySelectorAll('.name');
var _max = $menuItems.length;
var _isOpen = false;
var _isAni = false;

function menu(id)
    {
        var $close = $menuItems[id].querySelector('.close');
        function onClickMenu(e)
        {
            e.preventDefault();
            var $parent = this.parentElement;
            //*****
            if(_isAni) return;
            if(!$parent.classList.contains('selected'))
            {
                menuItemClassReset();
                $parent.classList.add('selected');
                _isOpen = true;
                _isAni = true; 
                    
                for(var i = 0; i < _max; i++)
                {
                    var width = 0;
                    if(i === id)
                    {
                        width = "100%"
                    }else{
                        width = "0"
                    }
                        $menuItems[i].style.width = width;        
                }
                    setTimeout(function()
                    {
                        _isAni = false;
                    }, 300);
            }        
        }   
            function onClickMenuClose(e)
            {
                e.preventDefault();
                var $parent = this.parentElement;
                if($parent.classList.contains('selected'))
                {
                    _isOpen = false;
                    $parent.classList.remove('selected');
                    for(var i = 0; i < _max; i++){
                        width = "20%"
                        $menuItems[i].style.width = width;
                    }
                }

            }
            $menuItemsEl[id].addEventListener('click', onClickMenu);
            $close.addEventListener('click', onClickMenuClose);
        }
    
for(var i = 0; i < _max; i++){
    menu(i);
}
function menuItemClassReset(){
    for(var i = 0; i < _max; i++){
        $menuItems[i].classList.remove('selected');
    }
}

function onResize(){
    $menu.classList.add('resize');
    _winW = window.innerWidth;
}
onResize();
window.addEventListener('resize', onResize);

