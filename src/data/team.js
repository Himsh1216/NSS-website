// People shown on the Team page.
//
// Photos live in public/Team_photos/. Drop a photo at the `image` path below and
// it appears automatically; until then the card shows a neutral placeholder.
// Earlier rosters are kept under public/Team_photos/archive/<academic-year>/
// together with a roster.json describing every team and member.

export const facultyCoordinators = [
  {
    id: 'mihir-kumar-das',
    name: 'Prof. Mihir Kumar Das',
    role: 'Dean of Student Affairs',
    school: 'School of Mechanical Sciences',
    image: '/Team_photos/Mihir_Kumar_Das_sir.jpg',
    description:
      'Prof. Mihir Kumar Das is a Professor in the School of Mechanical Sciences at IIT Bhubaneswar ' +
      'and serves as the Dean of Student Affairs. The Dean’s office looks after student welfare, ' +
      'hostels, clubs and societies, and the NSS unit carries out its outreach programmes under its guidance.',
  },
  {
    id: 'ankit-dalal',
    name: 'Dr. Ankit Dalal',
    role: 'NSS Programme Coordinator',
    school: 'School of Electrical & Computer Sciences',
    image: '/Team_photos/Ankit_Dalal_sir.jpg',
    description:
      'Dr. Ankit Dalal is a faculty member of the School of Electrical & Computer Sciences at IIT Bhubaneswar ' +
      'and the Programme Coordinator of the NSS unit. He guides the volunteers, oversees the unit’s ' +
      'camps, drives and events, and is its link with the institute administration.',
  },
];

export const teamMentor = [
  {
    id: 'himanshu-sharma',
    name: 'Himanshu Sharma',
    role: 'Team Mentor',
    image: '/Team_photos/Himanshu_Sharma_photo.jpeg',
  },
];
