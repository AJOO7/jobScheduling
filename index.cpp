#include<stdio.h>
#include<conio.h>
#include<iostream>
#include<stdlib.h>
#define MAX 50
class sequencingProblem{
//  int data[MAX][MAX];
//  int no_of_machines;
//  int no_of_jobs;
//  int sequence[MAX];
//  int sequenceMark[MAX];
//  int idleTime[MAX];
//  int inTime[MAX][MAX];
//  int outTime[MAX][MAX];
//  int fakeMachine[MAX][MAX];
//  int totalTime;
//  public:
//   sequencingProblem(){
//    int i,j;
//    for(i=0;i<MAX;i++){
//     sequence[i]=0;
//     sequenceMark[i]=0;
//     idleTime[i]=0;
//     for(j=0;j<MAX;j++){
//      data[i][j]=0;
//      inTime[i][j]=0;
//      outTime[i][j]=0;
//      fakeMachine[i][j]=0;
//     }
//    }
//    totalTime=no_of_jobs=no_of_machines=0;
//   }
//   void setNoOfMachine(int no){no_of_machines=no;}
//   void setNoOfJob(int no){no_of_jobs=no;}
//   void makeSequence(int [][MAX]);
//   void setData();
//   void displaySequence();
//   void display();
//   int getMinValue(int [],int);
//   int getPosition(int [],int,int,int);
//   int countValue(int [],int,int);
//   void calculateInOutTime();
//   void countIdleTime();
//   void countTotalTime();
//   void makeFakeMachine();
// };
// void sequencingProblem::makeFakeMachine(){
//  int i,j;
//  for(i=0;i<no_of_jobs;i++){
//   for(j=0;j<no_of_machines-1;j++)
//    fakeMachine[0][i]+=data[j][i];
//  }
//  for(i=0;i<no_of_jobs;i++){
//   for(j=1;j<no_of_machines;j++)
//    fakeMachine[1][i]+=data[j][i];
//  }
// }
// void sequencingProblem::countTotalTime(){
//  totalTime=outTime[no_of_machines-1][no_of_jobs-1];
// }
// void sequencingProblem::countIdleTime(){
//  int i,j;
//  countTotalTime();
//  for(i=0;i<no_of_machines;i++){
//   idleTime[i]=inTime[i][0];
//   for(j=1;j<no_of_jobs;j++)
//    idleTime[i]+=inTime[i][j]-outTime[i][j-1];
//   idleTime[i]+=totalTime-outTime[i][no_of_jobs-1];
//  }
// }
// void sequencingProblem::calculateInOutTime(){
//  int i,j;
//  for(i=0;i<no_of_machines;i++){
//   if(i==0){
//    inTime[i][0]=0;
//    outTime[i][0]=data[i][sequence[0]-1];
//    for(j=1;j<no_of_jobs;j++){
//     inTime[i][j]=outTime[i][j-1];
//     outTime[i][j]=data[i][sequence[j]-1]+inTime[i][j];
//    }
//   }else{
//    for(j=0;j<no_of_jobs;j++){
//     if(j==0){
//      inTime[i][j]=outTime[i-1][j];
//      outTime[i][j]=data[i][sequence[j]-1]+inTime[i][j];
//     }else{
//      if(outTime[i-1][j]<outTime[i][j-1])
//       inTime[i][j]=outTime[i][j-1];
//      else
//       inTime[i][j]=outTime[i-1][j];
//      outTime[i][j]=inTime[i][j]+data[i][sequence[j]-1];
//     }
//    }
//   }
//  }
// }
// int sequencingProblem::getMinValue(int array[],int no){
//  int min=9999;
//  for(int i=0;i<no;i++)
//   if(sequenceMark[i]!=1)
//    if(min>array[i])
//     min=array[i];
//  return min;
// }
// int sequencingProblem::getPosition(int array[],int start,int end,int value){
//  for(int i=start;i<end;i++)
//   if(sequenceMark[i]!=1)
//    if(value==array[i])
//     return i;
//  return -1;
// }
// int sequencingProblem::countValue(int array[],int no,int value){
//  int count=0;
//  for(int i=0;i<no;i++)
//   if(sequenceMark[i]!=1)
//    if(value==array[i])
//     count++;
//  return count;
// }
// void sequencingProblem::makeSequence(int array[][MAX]){
//  int i,j,minOfM1,minOfM2;
//  int pos=-1,temp_pos=-1,totalMin,totalMin1,min,max;
//  int start=0,end=no_of_jobs-1;
//  for(i=0;i<no_of_jobs;i++){
//   minOfM1=getMinValue(array[0],no_of_jobs);
//   minOfM2=getMinValue(array[1],no_of_jobs);
//   temp_pos=pos=-1;
//   if(minOfM1<minOfM2){
//    totalMin=countValue(array[0],no_of_jobs,minOfM1);
//    for(j=0;j<totalMin;j++){
//     min=9999;
//     if(totalMin>1){
//      temp_pos=getPosition(array[0],temp_pos+1,no_of_jobs,minOfM1);
//      if(array[1][temp_pos]<min){
//       min=array[1][temp_pos];
//       pos=temp_pos;
//      }
//     }
//     else
//      pos=getPosition(array[0],pos+1,no_of_jobs,minOfM1);
//     sequence[start++]=pos+1;
//     sequenceMark[pos]=1;
//    }
//   }else if(minOfM1>minOfM2){
//    totalMin=countValue(array[1],no_of_jobs,minOfM2);
//    for(j=0;j<totalMin;j++){
//     if(totalMin>1){
//      max=0;
//      for(int k=0;k<totalMin;k++){
//       temp_pos=getPosition(array[1],temp_pos+1,no_of_jobs,minOfM2);
//       if(array[0][temp_pos]>max){
//        max=array[0][temp_pos];
//        pos=temp_pos;
//       }
//      }
//     }
//     else
//      pos=getPosition(array[1],pos+1,no_of_jobs,minOfM2);
//     sequence[end--]=pos+1;
//     sequenceMark[pos]=1;
//    }
//   }else if(minOfM1==minOfM2 && minOfM1!=9999){
//    totalMin=countValue(array[0],no_of_jobs,minOfM1);
//    totalMin1=countValue(array[1],no_of_jobs,minOfM2);
//    for(j=0;j<totalMin;j++){
//     pos=getPosition(array[0],pos+1,no_of_jobs,minOfM1);
//     sequence[start++]=pos+1;
//     sequenceMark[pos]=1;
//    }
//    pos=-1;
//    for(j=0;j<totalMin1;j++){
//     pos=getPosition(array[1],pos+1,no_of_jobs,minOfM2);
//     if(sequenceMark[pos]==0 && pos!=-1){
//      sequence[end--]=pos+1;
//      sequenceMark[pos]=1;
//     }
//    }
//   }
//  }
// }
// int getMax(int data[][MAX],int row,int col){
//  int i,j;
//  int max=0;
//  for(i=1;i<row-1;i++)
//   for(j=0;j<col;j++)
//    if(max<data[i][j])
//     max=data[i][j];
//  return max;
// }
void sequencingProblem::displaySequence(){
 cout<<"sequence: ";
 for(int i=0;i<no_of_jobs;i++)
  cout<<char(sequence[i]+64)<<"\t";
 cout<<endl;
}
// void sequencingProblem::setData(){
//  int i,j;
//  cout<<"Enter Data:\n";
//  for(i=0;i<no_of_machines;i++){
//   cout<<"For Machine "<<i+1<<" :";
//   for(j=0;j<no_of_jobs;j++)
//    cin>>data[i][j];
//  }
// }

void sequencingProblem::display(){
//  int i,j;
//  cout<<"Given Data:\n";
//  for(i=0;i<no_of_machines;i++){
//   cout<<"Machine "<<i+1<<" :";
//   for(j=0;j<no_of_jobs;j++)
//    cout<<data[i][j]<<"\t";
//   cout<<endl;
//  }
 if(no_of_machines>2){
  int minM1=getMinValue(data[0],no_of_jobs);
  int maxMM_1=getMax(data,no_of_machines,no_of_jobs);
  int minMM=getMinValue(data[no_of_machines-1],no_of_jobs);
  if(minM1>=maxMM_1 || minMM>=maxMM_1){
   makeFakeMachine();
   makeSequence(fakeMachine);
  }
  else{
   cout<<"\n\nNOTE: Solution Can Not possible Sorry...!!!";
   getch();
   exit(0);
  }
 }else
 makeSequence(data);
 displaySequence();
 calculateInOutTime();
 cout<<"\nsequence\t";
 for(i=0;i<no_of_machines;i++)
  cout<<"Machine "<<i+1<<" Time\t";
 cout<<endl<<"\t";
 for(i=0;i<no_of_machines;i++)
  cout<<"\tIn\tout";
 cout<<endl;
 for(i=0;i<no_of_jobs;i++){
  cout<<char(sequence[i]+64)<<"\t";
  for(j=0;j<no_of_machines;j++)
   cout<<"\t"<<inTime[j][i]<<"\t"<<outTime[j][i];
  cout<<endl;
 }
 countIdleTime();
 cout<<"\n\n\tTotal elapsed time :"<<totalTime;
 for(i=0;i<no_of_machines;i++)
  cout<<"\n\tTotal Idle Time for Machine "<<i+1<<" :"<<idleTime[i];
}
void main(){
//  clrscr();
//  int machine,job;
//  sequencingProblem sp1;
//  cout<<"enter no of machine:";
//  cin>>machine;
//  cout<<"enter no of job:";
//  cin>>job;
//  sp1.setNoOfMachine(machine);
//  sp1.setNoOfJob(job);
//  sp1.setData();
//  clrscr();
 sp1.display();
//  getch();
}