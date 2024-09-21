import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import FilerobotImageEditor from 'filerobot-image-editor'; // Load library from NPM
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
 //file that wil be edited
  file: File | null = null;
  fileUrl!: string;
  
  constructor(public imgService : ImagesService){}

  ngOnInit(){
    this. file = this.imgService.getFileToEdit();
    if(this.file){
      
    this.fileUrl= URL.createObjectURL(this.file as File);
    }
    
  
  }

  const { TABS, TOOLS } = FilerobotImageEditor;
const config = {
  source: 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg',
  onSave: (editedImageObject, designState) =>
    console.log('saved', editedImageObject, designState),
  annotationsCommon: {
    fill: '#ff0000',
  },
  Text: { text: 'Filerobot...' },
  Rotate: { angle: 90, componentType: 'slider' },
  translations: {
    profile: 'Profile',
    coverPhoto: 'Cover photo',
    facebook: 'Facebook',
    socialMedia: 'Social Media',
    fbProfileSize: '180x180px',
    fbCoverPhotoSize: '820x312px',
  },
  Crop: {
    presetsItems: [
      {
        titleKey: 'classicTv',
        descriptionKey: '4:3',
        ratio: 4 / 3,
        // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
      },
      {
        titleKey: 'cinemascope',
        descriptionKey: '21:9',
        ratio: 21 / 9,
        // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
      },
    ],
    presetsFolders: [
      {
        titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
        // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
        groups: [
          {
            titleKey: 'facebook',
            items: [
              {
                titleKey: 'profile',
                width: 180,
                height: 180,
                descriptionKey: 'fbProfileSize',
              },
              {
                titleKey: 'coverPhoto',
                width: 820,
                height: 312,
                descriptionKey: 'fbCoverPhotoSize',
              },
            ],
          },
        ],
      },
    ],
  },
  tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
  defaultTabId: TABS.ANNOTATE, // or 'Annotate'
  defaultToolId: TOOLS.TEXT, // or 'Text'
};

// Assuming we have a div with id="editor_container"
const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector('#editor_container') as HTMLElement, //make sure that document.querySelector('#editor_container') is not null
  config,
);

filerobotImageEditor.render({
  onClose: (closingReason) => {
    console.log('Closing reason', closingReason);
    filerobotImageEditor.terminate();
  },
});

}
