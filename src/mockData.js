export const mockChannels = [
  { id: 1, name: 'general', removable: false },
  { id: 2, name: 'random', removable: false },
  { id: 3, name: 'hexlet', removable: true },
  { id: 4, name: 'undefined', removable: true },
  { id: 5, name: 'null', removable: true },
  { id: 6, name: 'protected', removable: false },
];

export const mockMessages = [
  { id: 1, channelId: 1, username: 'gen>Lorem-3', text: 'Lorem, ipsum dolor.' },
  { id: 2, channelId: 1, username: 'gen>Lorem-6', text: 'Lorem ipsum dolor sit amet consectetur.' },
  { id: 3, channelId: 2, username: 'random>User-1', text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur id doloremque earum!' },
  { id: 4, channelId: 2, username: 'random>User-2', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, cumque beatae! Velit quas optio eum!' },
  { id: 5, channelId: 3, username: 'Tota', text: 'This is project number four' },
  { id: 6, channelId: 3, username: 'Kiril Mokevnin', text: 'Great job Dude!' },
  { id: 7, channelId: 3, username: 'mr.Lebowski', text: 'Yep...' },
  { id: 8, channelId: 4, username: 'Undefined_user-1', text: 'undefined undefined undefine' },
  { id: 9, channelId: 4, username: 'Undefined_user-2', text: 'End messsage' },
  { id: 10, channelId: 5, username: 'null>Lorem-20', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea rem quae omnis sunt deleniti minus! Cumque beatae tempore molestiae aperiam dolore, impedit expedita itaque quidem ab doloribus? Recusandae, quas in?' },
  { id: 11, channelId: 5, username: 'null>Lorem-30', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A hic error iusto incidunt ipsam ex quae ab officia voluptate repellendus, sequi quibusdam quia! Eos, dolores praesentium tempora animi voluptate doloribus non ipsa quis? Modi distinctio ipsum dolorem earum repellendus facilis.' },
  { id: 12, channelId: 6, username: 'prot>Lorem-50', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab voluptas alias reiciendis blanditiis, quibusdam et! Incidunt perspiciatis molestiae laudantium facere itaque maiores corrupti at consectetur minima officiis exercitationem quibusdam ipsa voluptatibus, facilis voluptatem reprehenderit accusamus quam asperiores eius fugiat. Quam aperiam exercitationem veritatis cumque repudiandae aliquid eum quidem voluptatum nostrum?' },
  { id: 13, channelId: 6, username: 'prot>Lorem-10', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat veniam labore quidem quaerat quam quae facere, aliquid, qui eligendi quasi perferendis eos, dolores in nulla? Dolore culpa blanditiis veniam? Ipsa velit quo iusto. Tempore laboriosam odio ea qui voluptates nostrum id inventore quisquam nisi minima! Est, veniam, minus harum minima error saepe accusantium laborum quidem, quo rem at ab? Id ea, nulla porro sequi voluptatibus perspiciatis repellat dolorem sint quod vitae! Aperiam numquam reiciendis at quia ullam, veniam similique sed cum officiis. Fugit, modi voluptate? Vel magni possimus sequi sapiente aliquam similique illum dignissimos eos perspiciatis quasi ab, iure adipisci!' },
];

export const mockCurrentChannelId = 1;

export const mockModal = {
  id: null,
  isOpened: false,
  typeCurrentModal: null,
};
