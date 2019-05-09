import BaseWidget from '../base_widget'
import AnnouncementContent from './src/AnnouncementContent'
import AnnouncementOptions from './src/AnnouncementOptions'

export default class Announcement extends BaseWidget {
  constructor() {
    super({
      name: 'Announcement',
      version: '0.1',
      icon: 'exclamation-triangle',
      defaultData: {
        text: 'You did not fill this out',
        color: '#34495e',
        textColor: '#ffffff',
        titleColor: '#fff0f0',
        accentColor: '#A0A0A0'
      }
    })
  }

  get Widget() {
    return AnnouncementContent
  }

  get Options() {
    return AnnouncementOptions
  }
}
